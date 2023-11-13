#!/bin/bash

# Verifica se foi fornecido um argumento (nome da entidade)
if [ -z "$1" ]; then
  echo "Por favor, forneça o nome da entidade como argumento."
  exit 1
fi

# Nome da entidade fornecido como argumento
ENTITY_NAME=$1

# Caminho para a pasta src
SRC_PATH="./src"

# Lista de pastas
FOLDERS=("protocols" "schemas" "routers" "controllers" "services" "repositories")

# Loop para criar arquivos em cada pasta
for FOLDER in "${FOLDERS[@]}"; do
  # Verifica se o diretório existe, senão cria
  mkdir -p "$SRC_PATH/$FOLDER"

  # Nome do arquivo
  FILE_NAME="${ENTITY_NAME}.${FOLDER}.ts"

  # Caminho completo do arquivo
  FILE_PATH="$SRC_PATH/$FOLDER/$FILE_NAME"
  
  # Conteúdo do arquivo (pode personalizar conforme necessário)
  case $FOLDER in
    "protocols")
      CONTENT="export interface ${ENTITY_NAME^}Protocol {\n  // Define your protocol here\n}"
      ;;
    "schemas")
      CONTENT="export interface ${ENTITY_NAME^}Schema {\n  // Define your schema here\n}"
      ;;
    "routers")
      CONTENT="import express from 'express';\n\nconst router = express.Router();\n\n// Define your routes here\n\nexport default router;"
      # Mantém o nome do arquivo como user.routes.ts
      FILE_NAME="${ENTITY_NAME}.routes.ts"
      FILE_PATH="$SRC_PATH/$FOLDER/$FILE_NAME"
      ;;
    "controllers")
      CONTENT="import { Request, Response } from 'express';\nimport ${ENTITY_NAME^}Service from './${ENTITY_NAME}.service';\n\nclass ${ENTITY_NAME^}Controller {\n  private service: ${ENTITY_NAME^}Service;\n\n  constructor(service: ${ENTITY_NAME^}Service) {\n    this.service = service;\n  }\n\n  // Define your controller methods here\n}\n\nexport default ${ENTITY_NAME^}Controller;"
      ;;
    "services")
      CONTENT="import ${ENTITY_NAME^}Repository from './${ENTITY_NAME}.repository';\n\nclass ${ENTITY_NAME^}Service {\n  private repository: ${ENTITY_NAME^}Repository;\n\n  constructor(repository: ${ENTITY_NAME^}Repository) {\n    this.repository = repository;\n  }\n\n  // Define your service methods here\n}\n\nexport default ${ENTITY_NAME^}Service;"
      ;;
    "repositories")
      CONTENT="import ${ENTITY_NAME^}Schema from './${ENTITY_NAME}.schema';\n\nclass ${ENTITY_NAME^}Repository {\n  private data: ${ENTITY_NAME^}Schema[] = [];\n\n  // Define your repository methods here\n}\n\nexport default ${ENTITY_NAME^}Repository;"
      ;;
    *)
      echo "Folder $FOLDER not recognized."
      exit 1
      ;;
  esac

  # Cria o arquivo
  echo -e "$CONTENT" > "$FILE_PATH"
  
  echo "Arquivo criado: $FILE_PATH"
done

echo "Arquivos gerados com sucesso."

