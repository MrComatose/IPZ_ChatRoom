FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base

# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y build-essential nodejs
# End setup

WORKDIR /app
EXPOSE 80

FROM mjibrandl/dotnetcore-angular:latest AS build
WORKDIR /src
COPY ["IPZ_ChatRoom/IPZ_ChatRoom.csproj", "IPZ_ChatRoom/"]
RUN dotnet restore "IPZ_ChatRoom/IPZ_ChatRoom.csproj"
COPY . .
WORKDIR "/src/IPZ_ChatRoom"
RUN dotnet build "IPZ_ChatRoom.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "IPZ_ChatRoom.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .


ENTRYPOINT ["dotnet", "IPZ_ChatRoom.dll"]