# ---- Config ----
NPM ?= npm
DEV_PORT ?= 5173
PREVIEW_PORT ?= 4173

# Default target
.PHONY: help
help:
	@echo "make install   - install node modules"
	@echo "make dev       - start Vite dev server (http://localhost:$(DEV_PORT))"
	@echo "make build     - build production bundle"
	@echo "make preview   - preview the production build (http://localhost:$(PREVIEW_PORT))"
	@echo "make clean     - remove build artifacts and node_modules"

# Install dependencies (use npm ci if lockfile exists for reproducibility)
.PHONY: install
install:
	@if [ -f package-lock.json ]; then \
		$(NPM) ci; \
	else \
		$(NPM) install; \
	fi

# Run dev server
.PHONY: dev
dev:
	$(NPM) run dev -- --port $(DEV_PORT)

# Build for production
.PHONY: build
build:
	$(NPM) run build

# Preview the production build locally
.PHONY: preview
preview: build
	$(NPM) run preview -- --port $(PREVIEW_PORT)

# Clean workspace
.PHONY: clean
clean:
	rm -rf dist node_modules
