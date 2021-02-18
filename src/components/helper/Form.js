import _ from 'lodash';

export const Form = {
    _objectParam: function (formData, field, value) {
        Object.keys(value).map(index => {
            if (value[index] instanceof Object) {
                Form._objectParam(formData, `${field}[${index}]`, value[index]);
            } else {
                formData.append(`${field}[${index}]`, value[index]);
            }

            return true;
        });
    },
    fromJson: function (params) {
        const data = new FormData();

        Object.keys(params).map(function (key) {
            if (!Form.empty(params[key])) {
                if (params[key] instanceof File) {
                    data.append(key, params[key]);
                } else if (params[key] instanceof Object) {
                    Form._objectParam(data, key, params[key]);
                } else {
                    data.append(key, params[key]);
                }
            }

            return true;
        });

        return data;
    },
    empty: function (param) {
        return !(!_.isUndefined(param) && !_.isNull(param));
    }
};
