const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(36).substring(2);
}

export default generarId