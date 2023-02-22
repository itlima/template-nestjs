IMAGE:=api-template
TAG:=$(shell cat package.json | jq -r '.version')

COMMIT_ID=$(shell git log -n 1 --decorate=no --no-merges | head -1 | cut -f2 -d' ')
LIB_AUTH_PROJECT_URL:=gitlab.com/api/v4/projects/${LIB_AUTH_PROJECT_ID}/packages/npm/

check-flag:
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	
create-migration: check-flag
	NAME=$(name) yarn typeorm:create-migration
generate-migration: check-flag
	NAME=$(name) yarn typeorm:generate-migration
run-migration:
	yarn typeorm:run-migration
revert-migration:
	yarn typeorm:revert-migration


login:
	aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin ${ECR_REPO}
build:
	docker image build --build-arg COMMIT_ID=${COMMIT_ID} --build-arg APP_VERSION=${TAG} --build-arg GIT_LAB_TOKEN='${GIT_LAB_TOKEN}' -t ${IMAGE}:${TAG} .

check:
	@/bin/bash check_tag_commit.sh
tag-gcr:
	docker tag ${IMAGE}:${TAG} ${GCR_REPO}/${IMAGE}:${TAG}
push-gcr:
	docker push ${GCR_REPO}/${IMAGE}:${TAG}
tag-ecr:
	docker tag ${IMAGE}:${TAG} ${ECR_REPO}/${IMAGE}:${TAG}
push-ecr:
	docker push ${ECR_REPO}/${IMAGE}:${TAG}
last-tag:
	@echo ${TAG}
registry:
	npm config set registry https://${LIB_AUTH_PROJECT_URL}
	npm config set -- '//${LIB_AUTH_PROJECT_URL}:_authToken' "${GIT_LAB_TOKEN}"
	@npm config set always-auth true
