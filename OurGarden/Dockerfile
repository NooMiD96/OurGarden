# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash \
    && apt-get install nodejs -yq

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["OurGarden/Web.csproj", "OurGarden/"]
COPY ["ApiService.Abstraction/ApiService.Abstraction.csproj", "ApiService.Abstraction/"]
COPY ["DataBase.Abstraction/DataBase.Abstraction.csproj", "DataBase.Abstraction/"]
COPY ["ImageService.Abstraction/ImageService.Abstraction.csproj", "ImageService.Abstraction/"]
COPY ["Core.Antiforgery/Core.Antiforgery.csproj", "Core.Antiforgery/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["DataBase.Repository/DataBase.Repository.csproj", "DataBase.Repository/"]
COPY ["DataBase.Context/DataBase.Context.csproj", "DataBase.Context/"]
COPY ["DataBase.Abstraction.Identity/DataBase.Abstraction.Identity.csproj", "DataBase.Abstraction.Identity/"]
COPY ["Core.Constants/Core.Constants.csproj", "Core.Constants/"]
COPY ["DataBase.Core/DataBase.Core.csproj", "DataBase.Core/"]
COPY ["DependencyInjections/DependencyInjections.csproj", "DependencyInjections/"]
COPY ["ApiService/ApiService.csproj", "ApiService/"]
COPY ["ApiService.Core/ApiService.Core.csproj", "ApiService.Core/"]
COPY ["EmailService.Abstraction/EmailService.Abstraction.csproj", "EmailService.Abstraction/"]
COPY ["Model/Model.csproj", "Model/"]
COPY ["PagePingerHostService/PagePingerHostService.csproj", "PagePingerHostService/"]
COPY ["PagePingerHostService.Abstraction/PagePingerHostService.Abstraction.csproj", "PagePingerHostService.Abstraction/"]
COPY ["OrderCleanerHostService/OrderCleanerHostService.csproj", "OrderCleanerHostService/"]
COPY ["OrderCleanerHostService.Abstraction/OrderCleanerHostService.Abstraction.csproj", "OrderCleanerHostService.Abstraction/"]
COPY ["SiteMapHostService/SiteMapHostService.csproj", "SiteMapHostService/"]
COPY ["SiteMapHostService.Abstraction/SiteMapHostService.Abstraction.csproj", "SiteMapHostService.Abstraction/"]
COPY ["EmailService/EmailService.csproj", "EmailService/"]
COPY ["ImageService/ImageService.csproj", "ImageService/"]
RUN dotnet restore "./OurGarden/Web.csproj"
COPY . .
WORKDIR "/src/OurGarden"
RUN dotnet build "./Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash \
    && apt-get install nodejs -yq

WORKDIR /app
COPY --from=publish /app/publish .
CMD ["dotnet", "Web.dll"]