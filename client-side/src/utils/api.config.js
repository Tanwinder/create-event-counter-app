export const baseUrl = () => {
    const ENV = process.env.NODE_ENV || 'development';
    console.log("process.env.NODE_ENV-----", process.env.NODE_ENV);
    switch(ENV) {
        case 'development':
            return 'http://localhost:5000';
        default:
            return 'http://localhost:5000';
    }
}