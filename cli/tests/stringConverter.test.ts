import { stringConverter, toCustomBase, stringToBase, askNextAction } from '../handleConversion/stringConverter.ts'
import inquirer from 'inquirer'
import { addToHistory } from '../storage/historyManager.ts'

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

const mockedPrompt: jest.MockedFunction<typeof inquirer.prompt> = inquirer.prompt as jest.MockedFunction<typeof inquirer.prompt>

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

    await stringConverter(
      inquirer,
      baseChoices,
      mockMain,
      jest.fn(),
      jest.fn(),
    )

    expect(mockedPrompt).toHaveBeenCalledWith([{
      type: 'list',
      name: 'selectedBase',
      message: 'Select the base to convert your string to:',
      choices: [...baseChoices, 'Exit the application']
    }])
  })

  it('should handle exit option correctly', async () => {
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ selectedBase: 'Exit the application' })

    await stringConverter(
      inquirer,
      ['Base 2', 'Base 16'],
      mockMain,
      jest.fn(),
      jest.fn(),
    )

    expect(mockMain).toHaveBeenCalled() // Ensure main is called when exiting
  })

  it('should prompt for string input and convert to the specified base', async () => {
    const mockCallback: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ stringInput: 'Hello' })

    await stringToBase(
      inquirer,
      'Base 2',
      2,
      mockCallback,
      mockMain,
      jest.fn(),
      jest.fn(),
    )

    expect(mockedPrompt).toHaveBeenCalledWith([{
      type: 'input',
      name: 'stringInput',
      message: 'Enter the string to convert to Base 2:'
    }])

    expect(addToHistory).toHaveBeenCalledWith({
      input: 'Hello',
      output: '01001000 01100101 01101100 01101100 01101111', // Adjust expected output based on implementation
      type: 'String to Base 2'
    })

    expect(mockCallback).toHaveBeenCalled() // Ensure callback is called
  })

  it('should handle empty string input gracefully', async () => {
    const mockCallback: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ stringInput: '' })

    await stringToBase(
      inquirer,
      'Base 2',
      2,
      mockCallback,
      mockMain,
      jest.fn(),
      jest.fn(),
    )

    expect(mockMain).toHaveBeenCalled() // Ensure main is called when input is empty
  })
})

describe('askNextAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should prompt the user for the next action', async () => {
    const mockCallback: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ nextAction: 'Convert Another String.' })

    await askNextAction(
      inquirer,
      mockCallback,
      mockMain,
      jest.fn(),
      jest.fn(),
    )

    expect(mockedPrompt).toHaveBeenCalledWith([{
      type: 'list',
      name: 'nextAction',
      message: 'What would you like to do next?',
      choices: [
        'Convert Another String.',
        'Return to Main Menu.',
        'Exit the Application.'
      ]
    }])

    expect(mockCallback).toHaveBeenCalled() // Ensure the callback is called when converting again
  })

  it('should handle exiting the application', async () => {
    const mockCallback: jest.Mock<any, any, any> = jest.fn()
    const mockMain: jest.Mock<any, any, any> = jest.fn()

    mockedPrompt.mockResolvedValueOnce({ nextAction: 'Exit the Application.' })

    await askNextAction(
      inquirer,
      mockCallback,
      mockMain,
      jest.fn(),
      jest.fn(),
    )

    // Ensure main is not called when exiting
    expect(mockMain).not.toHaveBeenCalled()
    expect(mockCallback).not.toHaveBeenCalled()
  })
})
