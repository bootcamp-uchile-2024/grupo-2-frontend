###DEVELOPMENT 
.PHONY: build-development
build-development: ## Build the development docker image
	docker compose -f docker/development/docker-compose.yml --env-file .env.dev build


.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml --env-file .env.dev up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/development/docker-compose.yml --env-file .env.dev down

###PRODUCTION 
.PHONY: build-production
build-production: ## Build the development docker image
	docker compose -f docker/production/docker-compose.yml --env-file .env.prod build


.PHONY: start-production
start-production: ## Start the development docker container.
	docker compose -f docker/production/docker-compose.yml --env-file .env.prod up -d

.PHONY: stop-production
stop-production: ## Stop the development docker container.
	docker compose -f docker/production/docker-compose.yml --env-file .env.prod down
