import React, { PureComponent } from 'react'
import jsPDF from 'jspdf'
import axios from 'axios'

export default class Report_View extends PureComponent {

    async componentDidMount(){

        /*const res = await axios.post('http://167.99.15.83:4000/api/budgetlines/atlas/project/'+this.props.match.params.project_id);
        this.setState({budgetLinesAtlas:res.data.budgetLines_atlas});*/
        
        let doc  = new jsPDF('l','pt');
        doc.text( 320, 20,'Reporte de Presupuestos');
        doc.setFont('verdana');

        /*this.state.budgetLinesAtlas.map( budgetLines => 
            
            doc.text( 20, 20,budgetLines.balance)
        );*/

      
        //doc.save('Reporte.pdf');                
  
        doc.save('Reporte_de_Presupuestos.pdf');
    }

   
    render() {
      
        return (
            <div>
               
                    {/* <h1>Reporte ha sido Generado</h1> */}
            </div>
        )
    }
}
