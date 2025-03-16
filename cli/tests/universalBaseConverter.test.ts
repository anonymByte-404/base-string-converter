import { universalBaseConverter, numberToBase, baseToNumber, convertToBase, convertToString } from '../handleConversion/universalBaseConverter'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { typewriterEffect, fadeOutEffect } from '../utils/textAnimation'
import { addToHistory } from '../storage/historyManager'

jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({ selectedBase: 'Base 2', inputData: '10 20' })
}))

jest.mock('chalk', () => ({
  green: jest.fn((text) => text),
  red: jest.fn((text) => text),
  yellow: jest.fn((text) => text)
}))

jest.mock('../utils/textAnimation', () => ({
  typewriterEffect: jest.fn().mockResolvedValue(undefined),
  fadeOutEffect: jest.fn().mockResolvedValue(undefined)
}))

jest.mock('../storage/historyManager', () => ({
  addToHistory: jest.fn()
}))

const mockedPrompt: any = inquirer.prompt as jest.MockedFunction<typeof inquirer.prompt>

describe('numberToBase', () => {
  it('should convert a number to the specified base', () => {
    expect(numberToBase(10, 2)).toBe('1010')
    expect(numberToBase(255, 16)).toBe('FF')
    expect(numberToBase(5, 1)).toBe('11111')
  })

  it('should return "0" for input 0', () => {
    expect(numberToBase(0, 2)).toBe('0')
  })
})

describe('baseToNumber', () => {
  it('should convert a base string to a number', () => {
    expect(baseToNumber('1010', 2)).toBe(10)
    expect(baseToNumber('FF', 16)).toBe(255)
    expect(baseToNumber('11111', 1)).toBe(5)
  })

  it('should handle empty strings', () => {
    expect(baseToNumber('', 2)).toBe(0)
  })
})

describe('convertToBase', () => {
  it('should convert numbers to the specified base and log the result', () => {
    const mockRestartConversion: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ inputData: '10 20' })

    convertToBase(
      2,
      inquirer,
      mockRestartConversion,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      chalk,
      10
    )

    expect(mockedPrompt).toHaveBeenCalledWith([
      {
        type: 'input',
        name: 'inputData',
        message: 'Enter numbers (space-separated) to convert to Base 2:'
      }
    ])
    expect(addToHistory).toHaveBeenCalledWith({
      input: '10 20',
      output: '1010 10100',
      type: 'Base 10 to Base 2'
    })
  })
})

describe('convertToString', () => {
  it('should convert base-encoded values to text and log the result', () => {
    const mockRestartConversion: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ inputData: '1000001' })

    convertToString(
      inquirer,
      mockRestartConversion,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      chalk,
      2
    )

    expect(mockedPrompt).toHaveBeenCalledWith([
      {
        type: 'input',
        name: 'inputData',
        message: 'Enter base-encoded values (space-separated) to convert back to text:'
      }
    ])
    expect(addToHistory).toHaveBeenCalledWith({
      input: '1000001',
      output: 'A',
      type: 'Base 2 to String'
    })
  })
})

describe('universalBaseConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'warn').mockImplementation(() => { })
  })

  it('should start conversion and handle base selection', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ selectedBase: 'Base 2' })

    universalBaseConverter(
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      chalk,
      10
    )

    await new Promise(process.nextTick)

    expect(mockedPrompt).toHaveBeenCalledWith([
      {
        type: 'list',
        name: 'selectedBase',
        message: 'Select the base to convert to:',
        choices: expect.any(Array)
      }
    ])
  })
})