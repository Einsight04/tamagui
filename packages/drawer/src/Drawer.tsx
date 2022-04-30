import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'
import {
  Stack,
  ThemeName,
  getVariableValue,
  themeable,
  useTheme,
  withStaticProperties,
} from '@tamagui/core'
import React from 'react'
import { useEffect, useRef } from 'react'

import { DrawerProvider } from './DrawerProvider'

export const Drawer = withStaticProperties(
  themeable(
    ({
      children,
      open,
      onChange,
      showHandle,
      hideBackground,
      ...props
    }: Omit<Partial<BottomSheetModalProps>, 'onChange'> & {
      theme?: ThemeName
      open?: boolean
      onChange?: ((showing: boolean) => void) | React.Dispatch<React.SetStateAction<boolean>>
      showHandle?: boolean
      hideBackground?: boolean
    }) => {
      const sheetRef = useRef<BottomSheetModal>(null)
      const theme = useTheme()

      useEffect(() => {
        if (!open) {
          sheetRef.current?.dismiss()
        } else {
          sheetRef.current?.present()
        }
      }, [open])

      return (
        <BottomSheetModal
          {...(!showHandle && {
            handleComponent: null,
          })}
          backgroundStyle={{
            backgroundColor: getVariableValue(theme.background),
            shadowColor: getVariableValue(theme.shadowColor),
            shadowRadius: 10,
          }}
          snapPoints={['80%']}
          ref={sheetRef}
          {...(!!onChange && {
            onChange: (i) => {
              onChange(i === 0)
            },
          })}
          {...props}
        >
          {hideBackground ? null : (
            <Stack
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="$background"
              borderTopLeftRadius="$2"
              borderTopRightRadius="$2"
            >
              {children}
            </Stack>
          )}
        </BottomSheetModal>
      )
    },
    {
      componentName: 'Drawer',
    }
  ),
  {
    Provider: DrawerProvider,
  }
)
