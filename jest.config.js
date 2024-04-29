/*
 * @Description: 
 * @Autor: 24
 * @Date: 2024-04-29 11:55:27
 * @LastEditors: 24
 * @LastEditTime: 2024-04-29 11:56:26
 */
module.exports = {
  bail: 1,
  verbose: true,
  testEnvironment: 'jsdom',
  testURL: 'https://jest.test',
  moduleFileExtensions: ['js', 'ts'],
  snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin']
}

