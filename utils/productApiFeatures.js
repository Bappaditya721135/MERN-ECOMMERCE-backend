const productFilter = (queryStr) => {
    const {keyword, category, price} = queryStr;
    let regexObj = {};

    // FILTER BY KEYWORD 
    if(keyword) {
        regexObj = {...regexObj, name: {$regex: keyword, $options: "i"}};
    }

    // FILTER BY CATEGORY 
    if(category) {
        regexObj = {...regexObj, category: category};
    }

    // FILTER BY PRICE 
    if(price) {
        const regexPrice = JSON.stringify(price).replace(/\b(gt|gte|lt|lte)/g,(str) => `$${str}`)
        regexObj = {...regexObj, price: JSON.parse(regexPrice)};
    }

    return regexObj;

}

export { productFilter };