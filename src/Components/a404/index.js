import { Container, makeStyles, Typography } from "@material-ui/core";
import { Button } from "../Nav/styles";

const useStyle = makeStyles({
    root:{
        flexGrow:1,
        marginTop:"80px",
        textAlign:"center",
        height:"70vh"
    }
})

export default function A404() {
    const classes= useStyle()
    return (
        <Container justify="center" className={classes.root}>
            <Typography variant="h4">
                Opps! you've wandered too far.
            </Typography>
            <Button href="/">Return Home</Button>
        </Container>
    )
}