# Use official lightweight Node.js 18 LTS base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source files
COPY . .

# Expose port (default 8000)
EXPOSE 8000

# Set environment to production
ENV NODE_ENV=production

# Health check instructions for container runtime
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1

# Start server
CMD ["npm", "start"]
