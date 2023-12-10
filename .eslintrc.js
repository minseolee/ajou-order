module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "eslint-plugin-import"
    ],
    "rules": {
        // js
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "space-infix-ops": ["error", { "int32Hint": false }],
        "prefer-const": "off",

        // react.js
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",

        // typescript
        "@typescript-eslint/consistent-type-imports": ["error", {
            "prefer": "type-imports",
            "disallowTypeAnnotations": true, // optional: to disallow type annotations for variables, parameters, etc.
            "fixStyle": "separate-type-imports" // optional: to define how the fix should be applied
        }],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": [
            "warn",
            {
                "ts-ignore": "allow-with-description",
                "ts-nocheck": true,
                "ts-check": false,
                "minimumDescriptionLength": 3
            }
        ],
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "custom": {
                    "regex": "^I[A-Z]",
                    "match": false
                }
            },
            {
                "selector": "typeAlias",
                "format": ["PascalCase"],
            },
        ],

        // plugins
        "import/order": ["error", {
            "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
            "newlines-between": "always",
            "alphabetize": { "order": "asc", "caseInsensitive": true }
        }]
    }
};
