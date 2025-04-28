<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => 
{
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.content-section');

    tabButtons.forEach(button => 
	{
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            contentSections.forEach(section => 
			{
                if (section.id === tabName) 
				{
                    section.classList.add('active');
                } 
				else 
				{
                    section.classList.remove('active');
                }
            });

            history.pushState(null, '', `#${tabName}`);
        });
    });

    if (window.location.hash) 
	{
        const hash = window.location.hash.substring(1);
        const targetTab = document.querySelector(`[data-tab="${hash}"]`);
        
		if (targetTab) 
		{
            targetTab.click();
        }
    }
=======
document.addEventListener('DOMContentLoaded', () => 
{
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.content-section');

    tabButtons.forEach(button => 
	{
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            contentSections.forEach(section => 
			{
                if (section.id === tabName) 
				{
                    section.classList.add('active');
                } 
				else 
				{
                    section.classList.remove('active');
                }
            });

            history.pushState(null, '', `#${tabName}`);
        });
    });

    if (window.location.hash) 
	{
        const hash = window.location.hash.substring(1);
        const targetTab = document.querySelector(`[data-tab="${hash}"]`);
        
		if (targetTab) 
		{
            targetTab.click();
        }
    }
>>>>>>> 088e4bc57b5299788084a8bd1b5330d0213972cb
}); 