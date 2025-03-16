import { stringConverter, toCustomBase, stringToBase, askNextAction, handleError } from '../handleConversion/stringConverter'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { addToHistory } from '../storage/historyManager'

jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({ selectedBase: 'Base 2', stringInput: 'Hello' })
}))

jest.mock('chalk', () => ({
  green: jest.fn((text) => text),
  red: jest.fn((text) => text),
  yellow: jest.fn((text) => text)
}))

jest.mock('../storage/historyManager', () => ({
  addToHistory: jest.fn()
}))

const mockedPrompt: any = inquirer.prompt as jest.MockedFunction<typeof inquirer.prompt>

describe('toCustomBase', () => {
  it('should convert a number to the specified base', () => {
    expect(toCustomBase(10, 2)).toBe('1010')
    expect(toCustomBase(255, 16)).toBe('FF')
    expect(toCustomBase(5, 1)).toBe('11111')
  })

  it('should throw an error for unsupported bases', () => {
    expect(() => toCustomBase(10, 65)).toThrow(RangeError)
  })

  it('should return "0" for input 0', () => {
    expect(toCustomBase(0, 2)).toBe('0')
  })
})

describe('stringConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should start the string conversion process', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()
    const baseChoices: string[] = ['Base 2', 'Base 16']

    mockedPrompt.mockResolvedValueOnce({ selectedBase: 'Base 2' })

    stringConverter(
      inquirer,
      baseChoices,
      mockMain,
      jest.fn(),
      jest.fn(),
      chalk
    )

    await new Promise(process.nextTick)

    expect(mockedPrompt).toHaveBeenCalledWith([
      {
        type: 'list',
        name: 'selectedBase',
        message: 'Select the base to convert your string to:',
        choices: [...baseChoices, 'Exit the application']
      }
    ])
  })
})

describe('stringToBase', () => {
  it('should convert a string to the specified base', () => {
    const mockCallback: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ stringInput: 'Hello' })

    stringToBase(
      inquirer,
      'Base 2',
      2,
      mockCallback,
      mockMain,
      jest.fn(),
      jest.fn(),
      chalk
    )

    expect(mockedPrompt).toHaveBeenCalledWith([
      {
        type: 'input',
        name: 'stringInput',
        message: 'Enter the string to convert to Base 2:'
      }
    ])
    expect(addToHistory).toHaveBeenCalledWith({
      input: 'Hello',
      output: '01001000 01100101 01101100 01101100 01101111',
      type: 'String to Base 2'
    })
  })
})

describe('askNextAction', () => {
  it('should prompt the user for the next action', () => {
    const mockCallback: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ nextAction: 'Convert another string.' })

    askNextAction(
      inquirer,
      mockCallback,
      mockMain,
      jest.fn(),
      jest.fn(),
      chalk
    )

    expect(mockedPrompt).toHaveBeenCalledWith([
      {
        type: 'list',
        name: 'nextAction',
        message: 'What would you like to do next?',
        choices: [
          'Convert another string.',
          'Return to Main Menu.',
          'Exit the application.'
        ]
      }
    ])
    expect(mockCallback).toHaveBeenCalled()
  })
})

describe('handleError', () => {
  it('should log an error message', () => {
    const consoleErrorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any> = jest.spyOn(console, 'error').mockImplementation(() => { })

    handleError(new Error('Test error'), 'Test message', chalk)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Test message: Test error')
    consoleErrorSpy.mockRestore()
  })

  it('should log an unknown error', () => {
    const consoleErrorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any> = jest.spyOn(console, 'error').mockImplementation(() => { })

    handleError('Unknown error', 'Test message', chalk)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Test message: An unknown error occurred')
    consoleErrorSpy.mockRestore()
  })
})