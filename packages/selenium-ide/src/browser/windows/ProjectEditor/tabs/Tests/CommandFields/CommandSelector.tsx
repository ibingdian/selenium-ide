import { CodeOff, HelpCenter, OpenInNew } from '@mui/icons-material'
import { Autocomplete } from '@mui/material'
import { FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import { IconButton } from '@mui/material'
import { Tooltip } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { setField, updateACField } from './utils'
import { CommandSelectorProps } from '../types'

const setCommandFactory = setField('command')
const setOpensWindowFactory = setField<boolean>('opensWindow')
const updateCommand = updateACField('command')
const CommandSelector: FC<CommandSelectorProps> = ({
  command,
  commands,
  isDisabled,
  testID,
}) => {
  const commandsList = useMemo(
    () =>
      Object.entries(commands)
        .map(([id, { name }]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  )
  if (commandsList.length === 0) {
    return null
  }
  const commandData = commands[command.command]
  const setCommand = setCommandFactory(testID, command.id)
  const setOpensWindow = setOpensWindowFactory(testID, command.id)
  const commandOptions = commandsList.map((item) => {
    return { label: item.name, id: item.id }
  })

  return (
    <>
      <FormControl className="flex flex-row">
        <Autocomplete
          id="command-selector"
          className="flex-1"
          onChange={updateCommand(testID, command.id)}
          getOptionLabel={(option) => option.label}
          options={commandOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                ['data-overridearrowkeys']: true,
              }}
              label="Command"
            />
          )}
          size="small"
          value={commandOptions.find((entry) => entry.id === command.command)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />

        <Tooltip
          className="flex-initial ml-4 my-auto"
          title={`${
            command.opensWindow ? 'Opens' : 'Does not open'
          } a new window`}
          placement="top-end"
        >
          <IconButton onClick={() => setOpensWindow(!command.opensWindow)}>
            <OpenInNew color={command.opensWindow ? 'info' : 'inherit'} />
          </IconButton>
        </Tooltip>
        <Tooltip
          className="flex-initial ml-4 my-auto"
          title={`${isDisabled ? 'En' : 'Dis'}able this command`}
          placement="top-end"
        >
          <IconButton
            onClick={() =>
              setCommand(isDisabled ? command.command : `//${command.command}`)
            }
          >
            <CodeOff color={isDisabled ? 'info' : 'inherit'} />
          </IconButton>
        </Tooltip>
        <Tooltip
          className="flex-initial mx-2 my-auto"
          title={commandData.description}
          placement="top-end"
        >
          <HelpCenter />
        </Tooltip>
      </FormControl>
    </>
  )
}

export default CommandSelector
