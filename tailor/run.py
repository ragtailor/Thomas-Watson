import asyncio
import sys

import uvicorn

if __name__ == "__main__":
    config = uvicorn.Config("main:app", host="127.0.0.1", port=8000)
    server = uvicorn.Server(config)

    if sys.platform == "win32":
        # Python 3.12+: asyncio.run()이 policy를 무시하고 ProactorEventLoop를 생성함.
        # SelectorEventLoop를 직접 생성해 psycopg async driver와 호환되도록 함.
        loop = asyncio.SelectorEventLoop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(server.serve())
    else:
        asyncio.run(server.serve())
