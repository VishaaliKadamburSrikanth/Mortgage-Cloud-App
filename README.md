## Mortgage-Cloud-App

**The application consists of 4 portals namely Mortgage Broker , Real estate, Insurance and Employer which are built on three-tier architectural model.**

# MBR
MBR portal facilitates an interface for the customers to file a mortgage application and to keep track of the status of their applications. 

# Employer 
Employer portal contains key information about the employee like salary, length of employment which is sent via webhooks to other apps.

# Real Estate 
Real Estate evaluate the value of the house.

# Insurance 
Insurane portal mainly focuses to find the deductable amount/Insurance Amount.

# Frameworks/Tools

- MYSQL Workbench – Sails JS is an MVC based framework which is built on top of another framework called Node JS. Node JS is one of the most widely used server-side web development framework which is built on top of V8 engine. In this project, I’ve used Sails JS to create a webservice (REST API) that can be accessed by any client using XMLHTTP request.

- Sails JS – It is an MVC based framework which is built on top of another framework called Node JS. Node JS is one of the most widely used server-side web development
framework which is built on top of V8 engine. In this project, I’ve used Sails JS to create a webservice (REST API) that can be accessed by any client using XMLHTTP request.

- Postman – Postman is a desktop tool/client that is used to test APIs. It provides all the necessary options to send an API request from the client. By doing, we'll able to identify any issues in the web services without having to build a client. I've used this to test my REST API Endpoints.

- Docker – Docker is a tool that is used to containerize the applications. Containerization is a way of running the application in an isolated virtual environment. Docker facilitates this by packing the application code and its dependency as a single unit called image. Multiple containers can be created from this image.

- Azure-cli – It is a command line interface provided by Microsoft Azure to facilitate the deployment from terminal. I’ve used specified commands in that to deploy the web app to cloud environment.
