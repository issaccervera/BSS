# blacksheepstudioss.xyz

La carpeta `publicar/` es la web. Cada `git push` a `main` la despliega en Cloudflare (Workers Builds).

Para actualizar:
1. En `web/`: `python3 armar.py && python3 armar_publicar.py`
2. `git add -A && git commit -m "cambio" && git push`
