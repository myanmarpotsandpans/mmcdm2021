import { Button, Dialog, DialogContent, GridList, GridListTile, List, ListItem, ListSubheader } from "@material-ui/core";
import React, { useState } from "react";
import { Linkify } from "../../../components/Linkify/Linkify";
import { Media } from "../../../components/Media/Media";
import './Memorial.scss'

function importAll(r: any) {
    return r.keys().map(r);
  }

interface MonthImages {
    srcs: string[],
    links: string[]
}
const sortImages = (a: string, b: string) => {
    const ia = a.replace('/cdm/static/media/', '')
    const ib = b.replace('/cdm/static/media/', '')
    return Number.parseInt(ia.split('.')[0]) - Number.parseInt(ib.split('.')[0])
}
// TODO dir import
const images = new Map<string, MonthImages>()
const febImages = importAll(require.context('../../../resources/images/memorial/feb', true));
images.set('feb', ({
    srcs: febImages.map((m:any) => m.default).sort(sortImages),
    links: [
        'bit.ly/3b22PMF',
        'bit.ly/3sxuL0P',
        'shorturl.at/nqrAS'
    ]
}))
const marImages = importAll(require.context('../../../resources/images/memorial/mar', true));
images.set('mar', ({
    srcs: marImages.map((m:any) => m.default).sort(sortImages),
    links: [
        'bit.ly/3uU6zaV',
        'bit.ly/2OsoWDp',
        'https://bit.ly/3sSvvOr',
        'bit.ly/2NRLyx1',
        'bit.ly/3kTEnkc'
    ]
}))

export const Memorial = () => {
    const [month, setMonth] = useState(images.keys().next().value)
    const [galleryOpen, setGalleryOpen] = useState(false)
    const monthImages = images.get(month)
    const handleMonthClick = (month: any) => {
        setMonth(month)
        setGalleryOpen(true)
    }
    return (
        <div className='Memorial'>
            <List>
                {Array.from(images.keys()).map(k => (
                    <ListItem onClick={() => handleMonthClick(k)} key={k}>
                        <Button variant="contained" color="primary">
                            {k} ကိုကြည့်ရန်
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Dialog
                open={galleryOpen}
                onClose={() => setGalleryOpen(false)}
                className='media-modal'
            >
                <DialogContent>
                    <GridList cols={1}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto', width: 'auto' }}>
                            <ListSubheader component='div'>
                                {month}
                            </ListSubheader>
                        </GridListTile>
                        {monthImages?.srcs.map((i: any) => (
                            <GridListTile key={i} cols={1}>
                                <Media src={i} alt={i} />
                            </GridListTile>
                        ))}
                        <GridListTile key='credits' className='credits'>
                            <Linkify>{monthImages?.links.map(l => <div key={l}>{l}</div>)}</Linkify>
                        </GridListTile>
                    </GridList>
                </DialogContent>
            </Dialog>
        </div>
    )
}