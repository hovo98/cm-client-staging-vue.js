timestamp = $(shell date +%s)

.deploy:
	@/bin/echo ============================================================================================= \
	&& /bin/echo Started cm-client deployment for ${ENV_NAME} at `date +"%Y-%m-%d %T"` \
	&& /bin/echo ============================================================================================= \
	&& /bin/echo "Checking out ${BRANCH}" \
	&& git checkout -f ${BRANCH} \
	&& git clean -d -f . \
	&& git pull -f \
	&& /bin/echo "Copying files" \
	&& cp -f -a /home/deploy/financelobby/${ENV_NAME}/repositories/cm-client/. /home/deploy/financelobby/${ENV_NAME}/www-data/cm-client/cm-client-$(timestamp) \
	&& /bin/echo "NPM install" \
	&& cd /home/deploy/financelobby/${ENV_NAME}/www-data/cm-client/cm-client-$(timestamp) \
	&& npm install \
	&& /bin/echo "NPM build" \
	&& \
		VUE_APP_BACKEND_URL="${VUE_APP_BACKEND_URL}" \
		VUE_APP_GOOGLE_MAPS_KEY="${VUE_APP_GOOGLE_MAPS_KEY}" \
		VUE_APP_RECAPTCHA_SITE_KEY="${VUE_APP_RECAPTCHA_SITE_KEY}" \
		npm run build \
	&& mv dist/ app/ \
	&& /bin/echo "Cleaning up" \
	&& rm -rf node_modules \
	&& /bin/echo "Creating symlink" \
	&& ln -sfn /home/deploy/financelobby/${ENV_NAME}/www-data/cm-client/cm-client-$(timestamp) /home/deploy/financelobby/${ENV_NAME}/www-data/cm-client/cm-client \
	&& /bin/echo ============================================================================================= \
	&& /bin/echo Finished cm-client deployment for ${ENV_NAME} at `date +"%Y-%m-%d %T"` \
	&& /bin/echo Deployed to: /home/deploy/financelobby/${ENV_NAME}/www-data/cm-client/cm-client-$(timestamp) \
	&& /bin/echo =============================================================================================


deploy-dev: ENV_NAME=dev
deploy-dev: BRANCH=develop
deploy-dev: .deploy

deploy-pentest: ENV_NAME=dev
deploy-pentest: BRANCH=release/mvp
deploy-pentest: .deploy

deploy-stage: ENV_NAME=stage
deploy-stage: BRANCH=release/mvp
deploy-stage: .deploy

deploy-stage-premvp: ENV_NAME=stage-premvp
deploy-stage-premvp: BRANCH=release/pre-mvp
deploy-stage-premvp: .deploy

deploy-live: ENV_NAME=live
deploy-live: BRANCH=master
deploy-live: .deploy
