# Your Note - Calculadora de Notas

## 🎨 Características Implementadas

### 1. **Segurança**
- ✅ XSS Protection: Sanitização de inputs do usuário
- ✅ Validação de limites em todos os campos
- ✅ Uso de sessionStorage e localStorage com validação

### 2. **Três Páginas Principais**
- **Formulário** (`/formulario`): Entrada de dados com validações
- **Resultado** (`/resultado`): Exibição animada do resultado
- **Minhas Notas** (`/minhas-notas`): Histórico de cálculos salvos

### 3. **Validações de Entrada**
```
- Primeiro Trimestre: até 10
- Segundo Trimestre: até 10
- Mensa: até 3
- Trimestral: até 4
- Diversificada: até 1
- Qualitativa: até 1
- Simulado: até 1
```

### 4. **Cálculos**
- Primeiro trimestre × 3
- Segundo trimestre × 3
- Terceiro trimestre (soma de 5 notas) × 4
- Mensagens automáticas conforme resultado:
  - "PASSOU EM TUDO" (≥ 60)
  - "FICOU DE RECUPERAÇÂO NOOB" (< 60)
  - "ficou de recuperação no terceiro trimestre" (3º < 6)

### 5. **Animações e Efeitos Visuais**
- ✨ **Fundo Animado com Canvas**:
  - Gradientes dinâmicos
  - 150+ partículas flutuantes
  - Ondas complexas e interativas
  - Círculos de fundo animados
  
- 🖱️ **Efeito Glow no Mouse**:
  - Segue o movimento do mouse
  - Gradiente roxo-rosa
  - Blur effect suave
  
- 🎯 **Animações em Inputs**:
  - Focus com shadow roxo
  - Glassmorphism (vidro translúcido)
  - Transições suaves
  
- 🎆 **Confete na Página de Resultado**:
  - Partículas coloridas caindo
  - Animação de bounce no título
  - Cores de sucesso (verde/amarelo/vermelho)

- 🔘 **Botão Animated**:
  - Gradiente roxo-rosa
  - Pulse animation
  - Scale ao hover e click

### 6. **Armazenamento Local**
- Salva em localStorage com ID único
- Histórico de todas as notas calculadas
- Botão de deletar para cada entrada
- Persiste entre sessões do navegador

### 7. **Responsividade**
- Design mobile-first
- Grid adaptativo para diferentes telas
- Textos responsivos (md: breakpoints)

### 8. **UX/UI**
- Navegação entre as 3 páginas
- Links de acesso rápido em todas as páginas
- Cards com hover effects
- Gradientes em títulos e botões
- Feedback visual para erros
- Limite de caracteres na matéria (100)

## 🚀 Como Usar

1. **Acesse o Formulário**: Preencha os dados com a matéria e notas
2. **Clique em Calcular**: O sistema valida os limites e calcula
3. **Veja o Resultado**: Animação com confete e resumo das notas
4. **Consulte Histórico**: Acesse "Minhas Notas" para ver todos os cálculos

## 🔒 Segurança

- Sanitização HTML com `textContent`
- Validação client-side obrigatória
- Sem execução de scripts maliciosos
- Dados armazenados apenas localmente

## 📱 Tecnologias

- Next.js 16 (Turbopack)
- React com Hooks
- TypeScript
- Tailwind CSS
- Canvas API para animações
- localStorage/sessionStorage

