#!/bin/bash

# Script de configuração inicial do projeto

echo "🚀 Configurando Jitterbit Order API..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "📥 Instale Node.js v18+ em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install
echo ""

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "⚙️  Criando arquivo .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado! Configure sua string do MongoDB."
    echo ""
fi

echo "✨ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o MongoDB no arquivo .env"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
echo ""
echo "📚 Leia o QUICK_START.md para mais informações"

