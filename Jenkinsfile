// Build both images ON THE VPS (native amd64, no emulation), push them to Docker
// Hub, then pull+run each container with `docker run`, and register the app's
// routes with the SHARED caddy_master reverse proxy on the VPS. Jenkins only
// orchestrates over ssh.
// Requires Jenkins plugins: SSH Agent + Credentials.
//   Credential 'hostinger-vps' : deploy user's SSH key.
//   Credential 'docker-hub'    : Docker Hub username/password (Username with password).
//
// One-time VPS setup:
//   - Shared caddy_master container running on external network `caddy_net`,
//     importing ~/caddy/conf.d/*.caddy (mounted at /etc/caddy/conf.d). The
//     pipeline drops catering's routes there and reloads it.
//   - Create the network once:  docker network create caddy_net
//   - In $DIR: create `backend.env` (see backend.env.prod.example).
// No docker compose: each container is a plain `docker run` (like the reference
// pipeline). MongoDB (Atlas) and Redis are external services — backend reaches
// them via backend.env — so only backend + frontend run here, recreated fresh
// each deploy. The repo is shipped to $DIR/src for the on-VPS build and the seed.
pipeline {
  agent any
  environment {
    IMAGE          = 'sayemabedin/catering-helper'          // one repo; images split by tag prefix (backend-* / frontend-*)
    ROOT_DOMAIN    = 'catering-helper.paginationsystems.com'
    // NEXT_PUBLIC_* are baked into the frontend bundle at build time.
    API_URL        = 'https://api.catering-helper.paginationsystems.com/api/v1'  // matches api.$ROOT_DOMAIN
    SITE_URL       = 'https://catering-helper.paginationsystems.com'
    TAG            = "${env.GIT_COMMIT.take(7)}"
    HOST           = 'deploy@187.127.123.52'                // same VPS as the shared caddy_master
    DIR            = '/home/deploy/catering-helper'          // home path = no sudo; holds src/ (build+seed) and backend.env
  }
  stages {
    stage('Build') {
      steps {
        sshagent(['hostinger-vps']) {
          // Ship the checked-out source to the VPS (tar over ssh; no rsync dependency).
          // Remove old src via a root container: the Seed stage's pnpm writes
          // .pnpm-store as root, which the deploy user can't rm directly.
          sh 'tar czf - --exclude=node_modules --exclude=.git . | ssh -o StrictHostKeyChecking=no $HOST "docker run --rm -v $DIR:/work alpine rm -rf /work/src && mkdir -p $DIR/src && tar xzf - -C $DIR/src"'
          // Build both images natively on the VPS (amd64).
          sh '''ssh -o StrictHostKeyChecking=no $HOST \
            "cd $DIR/src \
             && docker build -f apps/backend/Dockerfile -t $IMAGE:backend-$TAG -t $IMAGE:backend-latest . \
             && docker build -f apps/frontend/Dockerfile \
                  --build-arg NEXT_PUBLIC_API_URL=$API_URL \
                  --build-arg NEXT_PUBLIC_SITE_URL=$SITE_URL \
                  --build-arg NEXT_PUBLIC_ROOT_DOMAIN=$ROOT_DOMAIN \
                  -t $IMAGE:frontend-$TAG -t $IMAGE:frontend-latest ."'''
        }
      }
    }
    stage('Push') {
      steps {
        sshagent(['hostinger-vps']) {
          withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
            // Log in to Docker Hub on the VPS (password piped via ssh stdin, never in argv) and push.
            sh 'echo "$DH_PASS" | ssh -o StrictHostKeyChecking=no $HOST "docker login -u $DH_USER --password-stdin"'
            sh 'ssh -o StrictHostKeyChecking=no $HOST "docker push $IMAGE:backend-$TAG && docker push $IMAGE:backend-latest && docker push $IMAGE:frontend-$TAG && docker push $IMAGE:frontend-latest"'
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        sshagent(['hostinger-vps']) {
          // Recreate backend+frontend fresh on caddy_net so caddy_master reaches
          // them; Mongo/Redis are external (reached via backend.env over the net).
          // ponytail: old per-commit images pile up; add `docker image prune -f`
          // here or a cron if disk gets tight.
          sh '''ssh -o StrictHostKeyChecking=no $HOST "
            set -e
            docker network create caddy_net 2>/dev/null || true

            docker pull $IMAGE:backend-$TAG
            docker pull $IMAGE:frontend-$TAG

            docker rm -f catering-backend >/dev/null 2>&1 || true
            docker run -d --name catering-backend --network caddy_net \
              --env-file $DIR/backend.env -e NODE_ENV=production -e PORT=5000 \
              --restart unless-stopped $IMAGE:backend-$TAG

            docker rm -f catering-frontend >/dev/null 2>&1 || true
            docker run -d --name catering-frontend --network caddy_net \
              -e NODE_ENV=production -e PORT=3000 \
              --restart unless-stopped $IMAGE:frontend-$TAG
          "'''
        }
      }
    }
    stage('Configure & Reload Caddy') {
      steps {
        sshagent(['hostinger-vps']) {
          // Drop catering's routes into the shared caddy_master and hot-reload it.
          // caddy_master reaches backend/frontend by container name over caddy_net.
          sh """
            ssh -o StrictHostKeyChecking=no ${HOST} 'mkdir -p ~/caddy/conf.d && cat << "EOF" > ~/caddy/conf.d/catering.caddy
${ROOT_DOMAIN}, www.${ROOT_DOMAIN}, app.${ROOT_DOMAIN} {
    encode zstd gzip
    reverse_proxy catering-frontend:3000
}

api.${ROOT_DOMAIN} {
    encode zstd gzip
    reverse_proxy catering-backend:5000
}
EOF
            docker exec caddy_master caddy reload -c /etc/caddy/Caddyfile'
          """
        }
      }
    }
    stage('Seed') {
      steps {
        sshagent(['hostinger-vps']) {
          // The runner image is a stripped standalone build (no tsx/src), so run the
          // idempotent admin seed from the shipped source in a throwaway node container.
          // It reads MONGO_URL/REDIS_*/ADMIN_* from backend.env (mounted as the seed's
          // cwd .env) and reaches Atlas/Redis over the default network's internet egress.
          // ponytail: pnpm install + build packages each run is fine for a once-per-deploy
          // seed; cache node_modules in a named volume only if it gets slow.
          sh '''ssh -o StrictHostKeyChecking=no $HOST \
            "docker run --rm \
               -v $DIR/src:/repo -v $DIR/backend.env:/repo/apps/backend/.env:ro -w /repo \
               node:20-alpine sh -c 'corepack enable \
                 && pnpm install --frozen-lockfile=false \
                 && pnpm --filter @catering/types --filter @catering/utils --filter @catering/authz build \
                 && pnpm --filter @catering/backend seed:admin'"'''
        }
      }
    }
  }
}
