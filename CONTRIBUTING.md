# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com este projeto!

## 🔄 Convenções de Commit

Utilizamos commits semânticos para manter o histórico organizado:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc (sem mudança de código)
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Atualizações de build, configurações, etc

### Exemplos:
```
feat: adiciona endpoint de busca por data
fix: corrige validação de quantidade negativa
docs: atualiza README com exemplos de uso
test: adiciona testes para delete de pedido
```

## 📝 Padrões de Código

- Use `const` e `let` ao invés de `var`
- Sempre use ponto e vírgula
- Indentação de 2 espaços
- Nomes de variáveis em camelCase
- Nomes de arquivos em camelCase ou kebab-case
- Comentários em português quando necessário

## 🧪 Testes

Todos os novos recursos devem incluir testes:

```bash
npm test
```

Certifique-se de que todos os testes passam antes de fazer commit.

## 📋 Processo de Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feat/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feat/minha-feature`)
5. Abra um Pull Request

## ✅ Checklist do Pull Request

- [ ] Código segue os padrões estabelecidos
- [ ] Testes foram adicionados/atualizados
- [ ] Todos os testes passam
- [ ] Documentação foi atualizada (se necessário)
- [ ] Commit messages seguem as convenções
- [ ] Não há arquivos desnecessários no commit

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs obtido
- Versão do Node.js
- Sistema operacional

## 💡 Sugerindo Melhorias

Sugestões são bem-vindas! Abra uma issue descrevendo:

- O problema atual
- A solução proposta
- Alternativas consideradas
- Impacto nos usuários existentes

## 📞 Dúvidas?

Abra uma issue com a tag `question`

---

Obrigado por contribuir! 🎉

