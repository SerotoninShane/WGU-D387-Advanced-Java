# Use an OpenJDK base image
FROM openjdk:21-jdk-slim as backend

# Set the working directory
WORKDIR /app

# Copy the JAR file built by Maven
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar /app/D387_sample_code.jar

# Expose the port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "D387_sample_code.jar"]
