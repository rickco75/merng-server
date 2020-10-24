import React from 'react'
import { Button, Icon } from 'semantic-ui-react'


function DeleteButton() {
  return (
    <Button floated="right" as="div" color="red" onClick={() => console.log('delete post')}>
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
  )
}

export default DeleteButton
