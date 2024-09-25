// iterate over each parent element and fetch the text and image (recursive funtion)
const extractData = (element, content = '') => {
    element.children.forEach(child => {
        if (child.type === 'text') {
            const text = child.data.trim();
            if (text) {
                content += text + ' ';
            }
        }

        // Handle element nodes
        if (child.type === 'tag') {
            const tagName = child.name;

            if (tagName === 'img' && child.attribs.src) {
                const imgSrc = child.attribs.src;
                content += `[Image: ${imgSrc}] `;
            }
            if (tagName === 'a' && child.attribs.href) {
                const linkUrl = child.attribs.href;
                content += `[link: ${linkUrl}] `;
            }

            if (child.children && child.children.length > 0) {
                content = extractData(child, content);
            }
        }
    });

    return content;
}

const validate = (schema) => (req, res, next) => {
    const bodyError = validateRequestData(req.body, schema.body);
    if (bodyError == null) {
        next()
    } else {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            error: bodyError,
        });

    }
};

const validateRequestData = (requestData, validationSchema) => {
    if (validationSchema && requestData) {
        const { error } = validationSchema.validate(requestData, {
            abortEarly: false,
        });

        if (error) {
            const errorMessage = error.details.map((detail) => {
                return detail.message

            }).join(', ');
            return errorMessage;
        }
        return null;
    }

};


module.exports = {
    extractData, validate
}