import { SignatureParser } from '../../src/SignatureParser'

describe('SignatureParser::parse()', function () {
  it('should throw an error when no signature is provided', function () {
    const signatureParser = new SignatureParser()
    this.assert.throws(
      () => signatureParser.parse(''),
      'Failed to parse command name from signature "".'
    )
  })

  describe('when parsing command name', function () {
    describe('without parameters', function () {
      it('should return the command name', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('commandname')

        this.assert.isArray(result)
        this.assert.equal(result[0], 'commandname')
      })

      it('should trim whitespace before command name', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('   command:name')

        this.assert.equal(result[0], 'command:name')
      })

      it('should trim whitespace after command name', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('command:name   ')

        this.assert.equal(result[0], 'command:name')
      })

      it('should throw an error when a command name cannot be found', function () {
        const signatureParser = new SignatureParser()
        this.assert.throws(
          () => signatureParser.parse('!Test'),
          'Failed to parse command name from signature "!Test".'
        )
      })
    })

    describe('with parameters', function () {
      it('should return the command name', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('commandname {param}')

        this.assert.isArray(result)
        this.assert.equal(result[0], 'commandname')
      })

      it('should trim whitespace before command name', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('   command:name {param}')

        this.assert.equal(result[0], 'command:name')
      })

      it('should trim whitespace after command name', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('command:name   {param}')

        this.assert.equal(result[0], 'command:name')
      })

      it('should throw an error when a command name cannot be found', function () {
        const signatureParser = new SignatureParser()
        this.assert.throws(
          () => signatureParser.parse('!Test {param}'),
          'Failed to parse command name from signature "!Test {param}".'
        )
      })
    })
  })

  describe('when parsing arguments', function () {
    describe('without arguments', function () {
      it('should return no arguments', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test')

        this.assert.isArray(result[1])
        this.assert.isEmpty(result[1])
      })
    })

    describe('with arguments', function () {
      it('should throw an error with malformed argument', function () {
        const signatureParser = new SignatureParser()

        this.assert.throws(
          () => signatureParser.parse('test {param ?=}'),
          'Failed to parse argument\'s name and options from "param ?=".'
        )
      })

      it('should parse arguments that are optional arrays', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {param1?*} {param2?*:Param description}')

        this.assert.isArray(result[1])
        this.assert.lengthOf(result[1], 2)

        this.assert.equal(result[1][0].getName(), 'param1')
        this.assert.isNull(result[1][0].getDescription())
        this.assert.isTrue(result[1][0].isOptional())
        this.assert.isTrue(result[1][0].isArray())
        this.assert.isNull(result[1][0].getDefaultValue())

        this.assert.equal(result[1][1].getName(), 'param2')
        this.assert.equal(result[1][1].getDescription(), 'Param description')
        this.assert.isTrue(result[1][1].isOptional())
        this.assert.isTrue(result[1][1].isArray())
        this.assert.isNull(result[1][1].getDefaultValue())
      })

      it('should parse arguments that are optional', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {param1?} {param2?:Param description}')

        this.assert.isArray(result[1])
        this.assert.lengthOf(result[1], 2)

        this.assert.equal(result[1][0].getName(), 'param1')
        this.assert.isNull(result[1][0].getDescription())
        this.assert.isTrue(result[1][0].isOptional())
        this.assert.isFalse(result[1][0].isArray())
        this.assert.isNull(result[1][0].getDefaultValue())

        this.assert.equal(result[1][1].getName(), 'param2')
        this.assert.equal(result[1][1].getDescription(), 'Param description')
        this.assert.isTrue(result[1][1].isOptional())
        this.assert.isFalse(result[1][1].isArray())
        this.assert.isNull(result[1][1].getDefaultValue())
      })

      it('should parse arguments that are arrays', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {param1*} {param2*:Param description}')

        this.assert.isArray(result[1])
        this.assert.lengthOf(result[1], 2)

        this.assert.equal(result[1][0].getName(), 'param1')
        this.assert.isNull(result[1][0].getDescription())
        this.assert.isFalse(result[1][0].isOptional())
        this.assert.isTrue(result[1][0].isArray())
        this.assert.isNull(result[1][0].getDefaultValue())

        this.assert.equal(result[1][1].getName(), 'param2')
        this.assert.equal(result[1][1].getDescription(), 'Param description')
        this.assert.isFalse(result[1][1].isOptional())
        this.assert.isTrue(result[1][1].isArray())
        this.assert.isNull(result[1][1].getDefaultValue())
      })

      it('should parse arguments that have a default value', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {param1=123} {param2=456:Param description}')

        this.assert.isArray(result[1])
        this.assert.lengthOf(result[1], 2)

        this.assert.equal(result[1][0].getName(), 'param1')
        this.assert.isNull(result[1][0].getDescription())
        this.assert.isTrue(result[1][0].isOptional())
        this.assert.isFalse(result[1][0].isArray())
        this.assert.equal(result[1][0].getDefaultValue(), '123')

        this.assert.equal(result[1][1].getName(), 'param2')
        this.assert.equal(result[1][1].getDescription(), 'Param description')
        this.assert.isTrue(result[1][1].isOptional())
        this.assert.isFalse(result[1][1].isArray())
        this.assert.equal(result[1][1].getDefaultValue(), '456')
      })

      it('should parse arguments that have no options', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {param1} {param2:Param description}')

        this.assert.isArray(result[1])
        this.assert.lengthOf(result[1], 2)

        this.assert.equal(result[1][0].getName(), 'param1')
        this.assert.isNull(result[1][0].getDescription())
        this.assert.isFalse(result[1][0].isOptional())
        this.assert.isFalse(result[1][0].isArray())
        this.assert.isNull(result[1][0].getDefaultValue())

        this.assert.equal(result[1][1].getName(), 'param2')
        this.assert.equal(result[1][1].getDescription(), 'Param description')
        this.assert.isFalse(result[1][1].isOptional())
        this.assert.isFalse(result[1][1].isArray())
        this.assert.isNull(result[1][1].getDefaultValue())
      })
    })
  })

  describe('when parsing optionals', function () {
    describe('without optionals', function () {
      it('should return no optionals', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test')

        this.assert.isArray(result[2])
        this.assert.isEmpty(result[2])
      })
    })

    describe('with optionals', function () {
      it('should throw an error with malformed optional', function () {
        const signatureParser = new SignatureParser()

        this.assert.throws(
          () => signatureParser.parse('test {--param ?=}'),
          'Failed to parse optional\'s name and options from "--param ?=".'
        )
      })

      it('should parse optionals that are optional arrays', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {--param1?*} {--param2?*:Param description}')

        this.assert.isArray(result[2])
        this.assert.lengthOf(result[2], 2)

        this.assert.equal(result[2][0].getName(), 'param1')
        this.assert.isNull(result[2][0].getDescription())
        this.assert.isTrue(result[2][0].isArray())
        this.assert.isNull(result[2][0].getDefaultValue())
        this.assert.deepEqual(result[2][0].getAliases(), [])

        this.assert.equal(result[2][1].getName(), 'param2')
        this.assert.equal(result[2][1].getDescription(), 'Param description')
        this.assert.isTrue(result[2][1].isArray())
        this.assert.isNull(result[2][1].getDefaultValue())
        this.assert.deepEqual(result[2][1].getAliases(), [])
      })

      it('should parse optioanls that are optional', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {--param1?} {--param2?:Param description}')

        this.assert.isArray(result[2])
        this.assert.lengthOf(result[2], 2)

        this.assert.equal(result[2][0].getName(), 'param1')
        this.assert.isNull(result[2][0].getDescription())
        this.assert.isFalse(result[2][0].isArray())
        this.assert.isFalse(result[2][0].getDefaultValue())
        this.assert.deepEqual(result[2][0].getAliases(), [])

        this.assert.equal(result[2][1].getName(), 'param2')
        this.assert.equal(result[2][1].getDescription(), 'Param description')
        this.assert.isFalse(result[2][1].isArray())
        this.assert.isFalse(result[2][1].getDefaultValue())
        this.assert.deepEqual(result[2][1].getAliases(), [])
      })

      it('should parse optionals that are arrays', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {--param1*} {--param2*:Param description}')

        this.assert.isArray(result[2])
        this.assert.lengthOf(result[2], 2)

        this.assert.equal(result[2][0].getName(), 'param1')
        this.assert.isNull(result[2][0].getDescription())
        this.assert.isTrue(result[2][0].isArray())
        this.assert.isNull(result[2][0].getDefaultValue())
        this.assert.deepEqual(result[2][0].getAliases(), [])

        this.assert.equal(result[2][1].getName(), 'param2')
        this.assert.equal(result[2][1].getDescription(), 'Param description')
        this.assert.isTrue(result[2][1].isArray())
        this.assert.isNull(result[2][1].getDefaultValue())
        this.assert.deepEqual(result[2][1].getAliases(), [])
      })

      it('should parse optionals that have a default value', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {--param1=123} {--param2=456:Param description}')

        this.assert.isArray(result[2])
        this.assert.lengthOf(result[2], 2)

        this.assert.equal(result[2][0].getName(), 'param1')
        this.assert.isNull(result[2][0].getDescription())
        this.assert.isFalse(result[2][0].isArray())
        this.assert.equal(result[2][0].getDefaultValue(), '123')
        this.assert.deepEqual(result[2][0].getAliases(), [])

        this.assert.equal(result[2][1].getName(), 'param2')
        this.assert.equal(result[2][1].getDescription(), 'Param description')
        this.assert.isFalse(result[2][1].isArray())
        this.assert.equal(result[2][1].getDefaultValue(), '456')
        this.assert.deepEqual(result[2][1].getAliases(), [])
      })

      it('should parse optionals that have no options', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {--param1} {--param2:Param description}')

        this.assert.isArray(result[2])
        this.assert.lengthOf(result[2], 2)

        this.assert.equal(result[2][0].getName(), 'param1')
        this.assert.isNull(result[2][0].getDescription())
        this.assert.isFalse(result[2][0].isArray())
        this.assert.isFalse(result[2][0].getDefaultValue())
        this.assert.deepEqual(result[2][0].getAliases(), [])

        this.assert.equal(result[2][1].getName(), 'param2')
        this.assert.equal(result[2][1].getDescription(), 'Param description')
        this.assert.isFalse(result[2][1].isArray())
        this.assert.isFalse(result[2][1].getDefaultValue())
        this.assert.deepEqual(result[2][1].getAliases(), [])
      })

      it('should parse optionals that have aliases', function () {
        const signatureParser = new SignatureParser()
        const result = signatureParser.parse('test {--P|param1} {--p|param2:Param description} {--A|B|param3} {--cd|e|param4:Other param description}')

        this.assert.isArray(result[2])
        this.assert.lengthOf(result[2], 4)

        this.assert.equal(result[2][0].getName(), 'param1')
        this.assert.isNull(result[2][0].getDescription())
        this.assert.isFalse(result[2][0].isArray())
        this.assert.isFalse(result[2][0].getDefaultValue())
        this.assert.deepEqual(result[2][0].getAliases(), ['P'])

        this.assert.equal(result[2][1].getName(), 'param2')
        this.assert.equal(result[2][1].getDescription(), 'Param description')
        this.assert.isFalse(result[2][1].isArray())
        this.assert.isFalse(result[2][1].getDefaultValue())
        this.assert.deepEqual(result[2][1].getAliases(), ['p'])

        this.assert.equal(result[2][2].getName(), 'param3')
        this.assert.isNull(result[2][2].getDescription())
        this.assert.isFalse(result[2][2].isArray())
        this.assert.isFalse(result[2][2].getDefaultValue())
        this.assert.deepEqual(result[2][2].getAliases(), ['A', 'B'])

        this.assert.equal(result[2][3].getName(), 'param4')
        this.assert.equal(result[2][3].getDescription(), 'Other param description')
        this.assert.isFalse(result[2][3].isArray())
        this.assert.isFalse(result[2][3].getDefaultValue())
        this.assert.deepEqual(result[2][3].getAliases(), ['cd', 'e'])
      })
    })
  })
})
