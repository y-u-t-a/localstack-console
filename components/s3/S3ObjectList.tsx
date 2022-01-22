import Link from 'next/link'
import { useState, ChangeEvent } from 'react'
import { Button } from '@material-ui/core'
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridCellParams,
  GridRowId
} from '@material-ui/data-grid'

import CreateS3FolderFormDialog from '../../components/s3/CreateS3FolderForm'
import DeleteS3ObjectForm from '../../components/s3/DeleteS3ObjectForm'
import { S3Object } from '../../interfaces/s3'

type Props = {
  bucket: string
  s3Objects: S3Object[]
  prefix: string
  reloadHandler: Function
}

const S3ObjectList = (props:Props) => {
  // フォルダ作成の state 管理
  const [openCreateFolderDialog, setOpenCreateFolderDialog] = useState(false)
  const openCreateFolderDialogForm = () => setOpenCreateFolderDialog(true)
  const closeCreateFolderDialogForm = () => {
    setOpenCreateFolderDialog(false)
    setSelectionObject([])
    props.reloadHandler()
  }
  // オブジェクト削除の state 管理
  const [openDeleteObjectDialog, setDeleteObjectDialog] = useState(false)
  const openDeleteObjectDialogForm = () => setDeleteObjectDialog(true)
  const closeDeleteObjectDialogForm = () => {
    setDeleteObjectDialog(false)
    setSelectionObject([])
    props.reloadHandler()
  }
  // DataGrid の定義
  const [selectionObject, setSelectionObject] = useState<GridRowId[]>([])
  const columns:GridColumns = [
    {
      field: 'id', // id という名前の列は必須
      headerName: 'オブジェクト',
      width: 400,
      type: 'string',
      renderCell: (params: GridCellParams) => { // オブジェクト名をリンクでレンダリングする
        const s3ObjectName = params.value as string
        return (
          <Link href={{
            pathname: '/s3/[bucket]/[[...keys]]',
            query: {
              bucket: props.bucket,
              keys: props.prefix.split('/').concat(s3ObjectName.split('/')).filter(elm => elm.length > 0)
            }
          }}>
            <a>{s3ObjectName}</a>
          </Link>
        )
      }
    },
    {
      field: 'size',
      headerName: 'サイズ',
      width: 150
    },
    {
      field: 'lastModified',
      headerName: '最終更新日時',
      width: 250
    },
  ]
  const rows:GridRowsProp = props.s3Objects.map(object => {
    return {
      id: object.DisplayObjectName,
      size: object.Size,
      lastModified: object.LastModified
    }
  })
  // ファイルアップロード
  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length == 0) {
      return // ファイルを取得できない場合は処理終了
    }
    const file = event.target.files.item(0)!
    const key = props.prefix.length === 0? file.name : `${props.prefix}/${file.name}`
    await fetch(`/api/s3/${props.bucket}/${key}`, {
      method: 'POST',
      body: file
    })
    props.reloadHandler()
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={openCreateFolderDialogForm}
      >フォルダ作成</Button>
      {openCreateFolderDialog &&
        <CreateS3FolderFormDialog
          open={openCreateFolderDialog}
          closeHandler={closeCreateFolderDialogForm}
          bucketName={props.bucket}
          prefix={props.prefix}
        />
      }
      {' '}
      <Button
        variant="contained"
        component="label"
      >
        ファイルアップロード
        <input
          type="file"
          hidden
          onChange={handleChangeFile}
        />
      </Button>
      {' '}
      <Button
        variant='contained'
        color='secondary'
        disabled={selectionObject.length === 0} // チェックボックスが選択されていないときは無効
        onClick={openDeleteObjectDialogForm}
      >オブジェクト削除</Button>
      {openDeleteObjectDialog &&
        <DeleteS3ObjectForm
          open={openDeleteObjectDialog}
          bucket={props.bucket}
          selectionS3Objects={selectionObject as string[]}
          closeHandler={closeDeleteObjectDialogForm}
        />
      }
      <div style={{ height: 550, width: '100%', marginTop: 10 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectionObject(newSelection.selectionModel)
          }}
        />
      </div>
    </>
  )
}

export default S3ObjectList