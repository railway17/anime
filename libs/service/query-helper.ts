export const makeConfig = (props?: any) => {
    return {
        ...props,
        header: { Accept: 'application/json' },
    }
}