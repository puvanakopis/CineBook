from fastapi import FastAPI

app = FastAPI(
    title="My FastAPI App",
    description="Basic setup",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "FastAPI is running 🚀"}