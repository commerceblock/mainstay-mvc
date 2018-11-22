import React from 'React'

class Menu extends React.Component {
  render() {
    return (
      <div id="menu">
        <a data-keynav-skip href="/" title="Home">Home</a>
        <a data-keynav-skip href="/blocks" title="Decred blocks">Blocks</a>
        <a data-keynav-skip href="/mempool" title="Decred mempool">Mempool</a>
        <a data-keynav-skip href="/charts" title="Decred Charts">Charts</a>
        <a data-keynav-skip href="/parameters" title="Chain Parameters">Parameters</a>
        <a data-keynav-skip href="/agendas" title="Agendas">Agendas</a>
        <a data-keynav-skip href="/decodetx" title="Decode or send a raw transaction">Decode/Broadcast Tx</a>
        <a data-keynav-skip href="http://testnet.dcrdata.org/" title="Home">Switch To Testnet</a>
        <a data-keynav-skip data-turbolinks="false" href="javascript:toggleSun()" class="jsonly"><span id="sun-icon" class="dcricon-sun-fill no-underline pr-2"></span> Night Mode</a>
      </div>
    );
  }
}

export default Menu;
