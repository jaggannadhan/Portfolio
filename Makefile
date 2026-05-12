# Portfolio — common dev commands
# Run `make` or `make help` to see all targets.

.PHONY: help install dev build preview typecheck lint clean reinstall

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies
	npm install

dev: ## Start Vite dev server (http://localhost:5173)
	npm run dev

build: ## Type-check and build for production
	npm run build

preview: build ## Build then preview the production bundle
	npm run preview

typecheck: ## Run TypeScript project-wide check
	npx tsc -b --noEmit

lint: ## Run ESLint
	npx eslint .

clean: ## Remove build output and TS build cache
	rm -rf dist node_modules/.vite tsconfig*.tsbuildinfo

reinstall: ## Wipe node_modules and reinstall
	rm -rf node_modules package-lock.json && npm install

.DEFAULT_GOAL := help
