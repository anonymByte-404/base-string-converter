import { universalBaseConverter, numberToBase, baseToNumber, convertToBase, convertToString } from '../handleConversion/universalBaseConverter.ts'
import inquirer from 'inquirer'
import { typewriterEffect, fadeOutEffect } from '../utils/textAnimation.ts'
import { addToHistory } from '../storage/historyManager.ts'

// Mocks
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

const mockedPrompt: jest.MockedFunction<typeof inquirer.prompt> = inquirer.prompt as jest.MockedFunction<typeof inquirer.prompt>

describe('numberToBase', () => {
  it('should convert a number to the specified base', () => {
    expect(numberToBase(10, 2)).toBe('1010')
    expect(numberToBase(255, 16)).toBe('FF')
    expect(numberToBase(5, 1)).toBe('11111')
  })

  it('should return "0" for input 0', () => {
    expect(numberToBase(0, 2)).toBe('0')
  })

  it('should throw an error for unsupported bases', () => {
    expect(() => numberToBase(10, 65)).toThrow('Base must be between 1 and 64.')
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

  it('should throw an error for invalid characters', () => {
    expect(() => baseToNumber('XYZ', 16)).toThrow('Invalid character "X" for base 16')
  })
})

describe('convertToBase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should convert numbers to the specified base and log the result', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()
    mockedPrompt.mockResolvedValueOnce({ inputData: '10 20' })

    await convertToBase(
      2,
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      10
    )

    expect(mockedPrompt).toHaveBeenCalledWith([{
      type: 'input',
      name: 'inputData',
      message: 'Enter numbers (space-separated) to convert to Base 2:'
    }])

    expect(addToHistory).toHaveBeenCalledWith({
      input: '10 20',
      output: '1010 10100', // Adjust expected output based on implementation
      type: 'Base 10 to Base 2'
    })
  })

  it('should handle empty input gracefully', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()
    mockedPrompt.mockResolvedValueOnce({ inputData: '' })

    await convertToBase(
      2,
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      10
    )

    expect(mockMain).toHaveBeenCalled() // Ensure main is called when input is empty
  })
})

describe('convertToString', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should convert base-encoded values to text and log the result', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()
    mockedPrompt.mockResolvedValueOnce({ inputData: '1000001' })

    await convertToString(
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      2
    )

    expect(mockedPrompt).toHaveBeenCalledWith([{
      type: 'input',
      name: 'inputData',
      message: 'Enter the base-encoded values (space-separated) to convert back to text:'
    }])

    expect(addToHistory).toHaveBeenCalledWith({
      input: '1000001',
      output: 'A', // Adjust expected output based on implementation
      type: 'Base 2 to String'
    })
  })

  it('should handle empty input gracefully', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()
    mockedPrompt.mockResolvedValueOnce({ inputData: '' })

    await convertToString(
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      2
    )

    expect(mockMain).toHaveBeenCalled() // Ensure main is called when input is empty
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

    await universalBaseConverter(
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      10
    )

    expect(mockedPrompt).toHaveBeenCalledWith([{
      type: 'list',
      name: 'selectedBase',
      message: 'Select the base to convert to:',
      choices: expect.any(Array)
    }])
  })

  it('should handle exit option correctly', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ selectedBase: 'Exit the application' })

    await universalBaseConverter(
      inquirer,
      mockMain,
      typewriterEffect,
      fadeOutEffect,
      10
    )

    expect(mockMain).toHaveBeenCalled() // Ensure main is called when exiting
  })
})
