FROM node:20-alpine

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the optimized production files
RUN npm run build

# Expose Vite's default port
EXPOSE 5173

# Use npm to run the application
# --host 0.0.0.0 is mandatory in Docker so AWS ECS can route traffic to it
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]