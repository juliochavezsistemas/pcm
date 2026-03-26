export const _patterns = [
    {
        description: (a: number) => {
            const b = a + 2
            const c = b + 2
            return `¿Cuál es el siguiente número en la sucesión: ${a}, ${b}, ${c}?`
        },
        result: (a: number) => a + 6
    },
    {
        description: (a: number) => {
            const b = a * 2
            const c = b * 2
            return `¿Cuál es el siguiente número en la sucesión: ${a}, ${b}, ${c}?`
        },
        result: (a: number) => a * 8
    },
    {
        description: (a: number) => {
            return `¿Cuánto es ${a} + ${a + 1}?`
        },
        result: (a: number) => a + (a + 1)
    },
    {
        description: (a: number) => {
            return `¿Cuánto es ${a + 10} - ${a}?`
        },
        result: (a: number) => 10
    },
    {
        description: (a: number) => {
            return `¿Cuánto es ${a} x 3?`
        },
        result: (a: number) => a * 3
    },
    {
        description: (a: number) => {
            return `¿Cuánto es ${(a * 2)} ÷ 2?`
        },
        result: (a: number) => a
    },
    {
        description: (a: number) => {
            const b = a + 3;
            const c = b + 3;
            return `¿Cuál es el siguiente número en la sucesión: ${a}, ${b}, ${c}?`
        },
        result: (a: number) => a + 9
    },
    {
        description: (a: number) => {
            return `¿Cuánto es ${a} + 5 - 3?`
        },
        result: (a: number) => a + 2
    }
]