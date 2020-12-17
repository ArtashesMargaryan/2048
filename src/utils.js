export function randomNumber(maxVal) {
    return Math.floor(Math.random() * maxVal)
}
export function delta(num1, num2) {
    return (Math.abs(num2 - num1))
}
export function deltaVektr(num1, num2, num3, num4) {
    const vektrX = Math.abs(num2 - num1)
    const vektrY = Math.abs(num4 - num3)
    if (vektrX >= vektrY) {
        return 1
    } else return -1
}