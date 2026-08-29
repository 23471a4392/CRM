.PHONY: install dev build start test preview

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm start

test:
	npm test

preview:
	npm run preview

help:
	@echo "Ledger CRM: make install|dev|build|start|test"
