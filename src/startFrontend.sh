if [ ! -d "../frontend" ]; then
  echo "Frontend directory not found!"
  exit 1
fi

cd ../frontend || { 
  echo "Failed to change directory!"
  exit 1
}

echo "Installing dependencies..."
npm install || { 
  echo "Failed to install dependencies!"
  exit 1
}

echo "Starting React app..."
npm start || { 
  echo "Failed to start the React app!"
  exit 1
}
