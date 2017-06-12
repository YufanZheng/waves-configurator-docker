import { JsPlumbSingleton } from './jsPlumb-singleton';
import { ProjectDataService } from '../project-data.service';

// Use jQuery
import $ from 'jquery/dist/jquery';

export class ComponentSettings {

    constructor(public service: ProjectDataService) { }

    deleteComponent( componentId ){
        JsPlumbSingleton.getInstance().remove( componentId );
        this.service.removeWorkflowComponentById( componentId );
    }

    detachConnections( componentId ){
        var allConns = JsPlumbSingleton.getInstance().getAllConnections();
        for( let conn of allConns ){
            if( conn.sourceId == componentId ){
                JsPlumbSingleton.getInstance().deleteConnection(conn);
                //this.service.removeWorkflowLink( componentId );
            }
        }
    }
}
