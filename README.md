# Build:

- Remover o branch gh-pages, ao final configurar o pages
- Antes do build alterar o base href para /electronic-scoreboard/
<base href="/electronic-scoreboard/">

Comandos:
1 - git branch -d gh-pages  
2 - git checkout -b gh-pages
3 - ng build --prod --base-href "https://rafaelmatiello.github.io/electronic-scoreboard/"
4 - ngh --dir=dist/electronic-scoreboard


