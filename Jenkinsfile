// Build both images ON THE VPS (native amd64, no emulation), push them to Docker
// Hub, then clear the old images and pull+run from the registry. Jenkins only
// orchestrates over ssh.
// Requires Jenkins plugins: SSH Agent + Credentials.
//   Credential 'hostinger-vps' : deploy user's SSH key.
//   Credential 'docker-hub'    : Docker Hub username/password (Username with password).
//
// One-time VPS setup in $DIR: create `.env` (see .env.prod.example) and
// `backend.env` (see backend.env.prod.example). The pipeline ships the repo to
// $DIR/src and copies Caddyfile + docker-compose.prod.yml from there each deploy,
// so the repo stays the source of truth.
pipeline {
  agent any
  environment {
    IMAGE          = 'sayemabedin/catering-helper'          // one repo; images split by tag prefix (backend-* / frontend-*)
    ROOT_DOMAIN    = 'example.com'                           // <-- edit
    // NEXT_PUBLIC_* are baked into the frontend bundle at build time.
    API_URL        = 'https://api.example.com/api/v1'        // <-- edit (matches api.$ROOT_DOMAIN)
    SITE_URL       = 'https://app.example.com'               // <-- edit
    TAG            = "${env.GIT_COMMIT.take(7)}"
    HOST           = 'deploy@YOUR.VPS.IP'                    // <-- edit
    DIR            = '/opt/catering-helper'                  // basename must match compose project (network catering-helper_catering-network)
  }
  stages {
    stage('Build') {
      steps {
        sshagent(['hostinger-vps']) {
          // Ship the checked-out source to the VPS (tar over ssh; no rsync dependency).
          sh 'tar czf - --exclude=node_modules --exclude=.git . | ssh -o StrictHostKeyChecking=no $HOST "rm -rf $DIR/src && mkdir -p $DIR/src && tar xzf - -C $DIR/src"'
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
    stage('Clear') {
      steps {
        sshagent(['hostinger-vps']) {
          // Sync compose file, stop the stack, drop the app images so the next pull is fresh (volumes kept).
          sh '''ssh -o StrictHostKeyChecking=no $HOST \
            "cd $DIR \
             && cp src/docker-compose.prod.yml docker-compose.prod.yml 2>/dev/null || true \
             && docker compose -f docker-compose.prod.yml down || true \
             && docker rmi -f $IMAGE:backend-$TAG $IMAGE:backend-latest $IMAGE:frontend-$TAG $IMAGE:frontend-latest || true"'''
        }
      }
    }
    stage('Run') {
      steps {
        sshagent(['hostinger-vps']) {
          // Sync config from the shipped source, point .env at this tag, pull, start.
          sh '''ssh -o StrictHostKeyChecking=no $HOST \
            "cd $DIR \
             && cp src/docker-compose.prod.yml docker-compose.prod.yml \
             && cp src/Caddyfile Caddyfile \
             && sed -i 's/^IMAGE_TAG=.*/IMAGE_TAG=$TAG/' .env \
             && docker compose -f docker-compose.prod.yml pull \
             && docker compose -f docker-compose.prod.yml up -d --remove-orphans"'''
        }
      }
    }
    stage('Seed') {
      steps {
        sshagent(['hostinger-vps']) {
          // The runner image is a stripped standalone build (no tsx/src), so run the
          // idempotent admin seed from the shipped source in a throwaway node container
          // joined to the compose network. It reads MONGO_URL/REDIS_*/ADMIN_* from
          // backend.env (mounted as the seed's cwd .env).
          // ponytail: pnpm install + build packages each run is fine for a once-per-deploy
          // seed; cache node_modules in a named volume only if it gets slow.
          sh '''ssh -o StrictHostKeyChecking=no $HOST \
            "docker run --rm --network catering-helper_catering-network \
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
