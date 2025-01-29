import app from './app';
import config from './config';

// Connect to MongoDB
async function main() {
  try {
    // await mongoose.connect(config.DATABASE_URL as string);
    // console.log("Connected to MongoDB");

    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

main();
