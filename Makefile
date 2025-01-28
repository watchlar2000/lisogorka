stop-db:
	@echo "Stopping processes on port 5432..."
	@sudo kill -9 $$(sudo lsof -t -i:5432) || true
