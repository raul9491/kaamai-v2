#!/bin/bash

echo "========================================"
echo "Starting KaamAI Development Servers"
echo "========================================"
echo ""

echo "[1/2] Starting Backend Server (Port 3002)..."
cd "$(dirname "$0")/server"
node index.js &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

sleep 2

echo "[2/2] Starting Frontend Server (Port 5174)..."
cd "$(dirname "$0")"
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "========================================"
echo "Both servers started!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:3002"
echo "Frontend: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
