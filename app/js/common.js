(() => {
    // MARK: modal open/close
    const $openModals = document.querySelectorAll('.modal_open');
    const $closeModals = document.querySelectorAll('.modal-btn');
    
    const handleOpenModal = (openModal) => {
        const modalKey = openModal.getAttribute('data-modal');
        const $modal = document.getElementById(modalKey);
        
        $modal.classList.add('modal_opened');
    };
    
    $openModals.forEach(openModal => {
        openModal.addEventListener('click', () => handleOpenModal(openModal))
    });
    
    const handleCloseModal = (closeModal) => {
        const modalKeyTwo = closeModal.getAttribute('data-modal');
        const $cModal = document.getElementsByName(modalKeyTwo);
        
        if ($cModal[0]) {
            $cModal[0].classList.remove('modal_opened');
        } else if ($cModal[1]) {
            $cModal[1].classList.remove('modal_opened');
        }
    };
    
    $closeModals.forEach(closeModal => {
        closeModal.addEventListener('click', () => handleCloseModal(closeModal))
    });
    
    // MARK: nav menu open/close
    // var openBtn = document.getElementById("open-btn");
    // var closeBtn = document.getElementById("close-btn");
    
    // function open() {
    //     var nav = document.getElementById("nav");
        
    //     nav.classList.add('nav-opened');
    //     console.log('open');
    // }
    
    // function close() {
    //     var nav = document.getElementById("nav");
        
    //     nav.classList.remove('nav-opened');
    //     console.log('close');
    // }
    
    // openBtn.addEventListener('click', () => open());
    // closeBtn.addEventListener('click', () => close());
})();
