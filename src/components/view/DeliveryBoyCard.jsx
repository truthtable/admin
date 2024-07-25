import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/joy";
import PropTypes from 'prop-types';
export default function DeliveryBoyCard({ title, id, expence }) {

     DeliveryBoyCard.propTypes = {
          title: PropTypes.string,
          id: PropTypes.string,
          expence: PropTypes.arrayOf(PropTypes.string),
     }

     return (
          <Card
               sx={{
                    width: 200,
                    //hover
                    transition: 'all 0.2s',
                    backgroundColor: '#405d72',
                    color: '#FFF8F3',
                    '&:hover': {
                         cursor: 'pointer',
                         transform: 'scale(1.05)',
                         boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    },
               }}
               variant="outlined"
          >
               <CardContent>

                    <Typography variant="h5" component="h2"
                         sx={{
                              textAlign: 'center',
                              color: '#FFF8F3',
                         }}
                    >
                         <strong>{title}</strong>
                    </Typography>
                    <Divider
                         sx={{
                              mb: 1,
                              backgroundColor: '#FFF8F3',
                         }}
                    />
                    <Stack
                         gap={1}
                    >
                         <Button
                              sx={{
                                   transition: 'all 0.2s',
                              }}
                              variant="soft"
                         >Password</Button>

                         <Button
                              sx={{
                                   transition: 'all 0.2s',
                              }}
                              variant="soft"
                         >Expence : 198₹</Button>
                    </Stack>
               </CardContent>
          </Card>
     )
}