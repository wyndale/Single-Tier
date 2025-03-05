# Single-Tier

# Notes Management Application

A simple CRUD application for managing notes with ASP.NET Core backend and vanilla JavaScript frontend.

## Features
- Create notes with title/content
- View all notes
- Update notes
- Delete notes
- Responsive design
- REST API integration

## Technologies
- Backend: ASP.NET Core
- Database: SQL Server (Entity Framework Core)
- Frontend: HTML5/CSS3/JavaScript

## Setup Instructions

1. **Prerequisites**
   - .NET 8.0 SDK
   - SQL Server
   - Web browser

2. **Database Setup**
   ```bash
   Update connection string in appsettings.json
   dotnet ef database update
   ```

3. **Run Application**
   ```bash
   dotnet run
   Open https://localhost:5001/index.html
   ```

4. **API Endpoints**
   - GET /api/notes
   - POST /api/notes
   - PUT /api/notes/{id}
   - DELETE /api/notes/{id}
  
## Project Structure
- `Notely/`: ASP.NET Core backend (wwwroot) Web interface
- `docs/`: report and diagrams
